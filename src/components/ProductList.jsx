import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant',        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sanseveria_trifasciata_trifasciata.jpg/800px-Sanseveria_trifasciata_trifasciata.jpg',   cost: 15, description: 'Produces oxygen at night, improving air quality.' },
      { name: 'Spider Plant',       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_0001.jpg/800px-Chlorophytum_comosum_0001.jpg',                  cost: 12, description: 'Filters formaldehyde and xylene from the air.' },
      { name: 'Peace Lily',         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg', cost: 18, description: 'Removes mold spores and purifies the air.' },
      { name: 'Boston Fern',        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Boston_fern_05_crop.jpg/800px-Boston_fern_05_crop.jpg',                               cost: 20, description: 'Acts as a natural air humidifier.' },
      { name: 'Rubber Plant',       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ficus_elastica_Rubber_Figure.jpg/800px-Ficus_elastica_Rubber_Figure.jpg',             cost: 17, description: 'Absorbs airborne chemicals, making air cleaner.' },
      { name: 'Aloe Vera',          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png',                         cost: 14, description: 'Purifies air and has soothing properties.' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender',           image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=400&q=60', cost: 20, description: 'Calming scent, promotes relaxation and sleep.' },
      { name: 'Jasmine',            image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=400&q=60', cost: 18, description: 'Sweet fragrance, often used in aromatherapy.' },
      { name: 'Rosemary',           image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=60', cost: 15, description: 'Invigorating scent, used in cooking and wellness.' },
      { name: 'Mint',               image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=400&q=60', cost: 12, description: 'Refreshing aroma, great for teas and recipes.' },
      { name: 'Lemon Balm',         image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=400&q=60', cost: 14, description: 'Citrusy fragrance, reduces stress and anxiety.' },
      { name: 'Hyacinth',           image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?auto=format&fit=crop&w=400&q=60', cost: 22, description: 'Sweet floral scent, brightens any room.' },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { name: 'Oregano',            image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=400&q=60', cost: 10, description: 'Naturally repels aphids and spider mites.' },
      { name: 'Marigold',           image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=60', cost: 8,  description: 'Repels mosquitoes, aphids, and whiteflies.' },
      { name: 'Geraniums',          image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?auto=format&fit=crop&w=400&q=60', cost: 12, description: 'Deters leafhoppers and mosquitoes.' },
      { name: 'Basil',              image: 'https://images.unsplash.com/photo-1600680943534-7d2d6c6f7d7b?auto=format&fit=crop&w=400&q=60', cost: 9,  description: 'Repels flies and mosquitoes naturally.' },
      { name: 'Lavender (Repel)',   image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=400&q=60', cost: 20, description: 'Repels moths, fleas, flies, and mosquitoes.' },
      { name: 'Catnip',             image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=400&q=60', cost: 13, description: 'Ten times more effective than DEET at repelling mosquitoes.' },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera (Med)',    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png', cost: 14, description: 'Soothes burns, wounds, and skin irritation.' },
      { name: 'Echinacea',          image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=400&q=60',                          cost: 16, description: 'Boosts immune system and fights infections.' },
      { name: 'Peppermint',         image: 'https://images.unsplash.com/photo-1599629954294-16b1e3b994f5?auto=format&fit=crop&w=400&q=60',                          cost: 13, description: 'Relieves headaches and digestive issues.' },
      { name: 'Lemon Balm (Med)',   image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=400&q=60',                          cost: 14, description: 'Reduces anxiety and promotes better sleep.' },
      { name: 'Feverfew',           image: 'https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?auto=format&fit=crop&w=400&q=60',                          cost: 11, description: 'Prevents migraines and reduces fever.' },
      { name: 'St. John\'s Wort',  image: 'https://images.unsplash.com/photo-1620127682229-33388276e540?auto=format&fit=crop&w=400&q=60',                          cost: 18, description: 'Treats depression and nerve pain.' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant',           image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=400&q=60', cost: 25, description: 'Thrives in low light and requires minimal watering.' },
      { name: 'Pothos',             image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=60', cost: 10, description: 'Almost impossible to kill, great for beginners.' },
      { name: 'Cast Iron Plant',    image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?auto=format&fit=crop&w=400&q=60', cost: 20, description: 'Tolerates low light and infrequent watering.' },
      { name: 'Succulents',         image: 'https://images.unsplash.com/photo-1531890082906-c5a86bce8c59?auto=format&fit=crop&w=400&q=60', cost: 8,  description: 'Store water in leaves; need very little care.' },
      { name: 'Aglaonema',          image: 'https://images.unsplash.com/photo-1598880940342-4e6f2600e445?auto=format&fit=crop&w=400&q=60', cost: 22, description: 'Adapts to low light and irregular watering.' },
      { name: 'Dracaena',           image: 'https://images.unsplash.com/photo-1611072337226-1d3d4e86d5a6?auto=format&fit=crop&w=400&q=60', cost: 18, description: 'Tolerates drought and various light conditions.' },
    ],
  },
];

function ProductList() {
  const dispatch   = useDispatch();
  const cartItems  = useSelector((state) => state.cart.items);
  const totalQty   = useSelector((state) => state.cart.totalQuantity);
  const [showCart, setShowCart] = useState(false);

  const isAdded = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#2d6a4f', color: '#fff', padding: '0.75rem 2rem',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>🌿 Paradise Nursery</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#plants" style={{ color: '#fff', textDecoration: 'none' }}>Plants</a>
          <button
            onClick={() => setShowCart(true)}
            style={{
              background: 'transparent', border: '2px solid #fff',
              color: '#fff', borderRadius: 6, padding: '4px 14px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            🛒 Cart
            <span style={{
              background: '#fff', color: '#2d6a4f', borderRadius: '50%',
              width: 22, height: 22, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem'
            }}>
              {totalQty}
            </span>
          </button>
        </div>
      </nav>

      {/* Plant Categories */}
      <div id="plants" style={{ padding: '2rem' }}>
        {plantsArray.map((category) => (
          <div key={category.category} style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#2d6a4f', borderBottom: '2px solid #2d6a4f', paddingBottom: 8 }}>
              {category.category}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 20,
            }}>
              {category.plants.map((plant) => (
                <div key={plant.name} style={{
                  background: 'rgba(255,255,255,0.92)', borderRadius: 12,
                  padding: 14, textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                }}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <h4 style={{ margin: '10px 0 4px', color: '#0b3d2e' }}>{plant.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#555', margin: '0 0 6px' }}>
                    {plant.description}
                  </p>
                  <p style={{ fontWeight: 700, color: '#2d6a4f', margin: '0 0 10px' }}>
                    ${plant.cost}
                  </p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={isAdded(plant.name)}
                    style={{
                      background: isAdded(plant.name) ? '#aaa' : '#2d6a4f',
                      color: '#fff', border: 'none', borderRadius: 6,
                      padding: '6px 14px', cursor: isAdded(plant.name) ? 'not-allowed' : 'pointer',
                      fontSize: '0.85rem', width: '100%',
                    }}
                  >
                    {isAdded(plant.name) ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
