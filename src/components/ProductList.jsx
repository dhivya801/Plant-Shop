import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addItem} from '../features/CartSlice';

const CATEGORIES = [
  {
    name: 'Ferns',
    plants: [
      ["Boston Fern", 12, plantImage('Ferns','Boston Fern')],
      ["Maidenhair Fern",14, plantImage('Ferns','Maidenhair Fern')],
      ["Staghorn Fern",18, plantImage('Ferns','Staghorn Fern')],
      ["Asparagus Fern",10, plantImage('Ferns','Asparagus Fern')],
      ["Rabbit Foot Fern",13, plantImage('Ferns','Rabbit Foot Fern')],
      ["Bird's Nest Fern",16, plantImage('Ferns','Birds Nest Fern')]
    ]
  },
  {
    name: 'Succulents',
    plants: [
      ["Aloe Vera",9, plantImage('Succulents','Aloe Vera')],
      ["Echeveria",8, plantImage('Succulents','Echeveria')],
      ["Haworthia",7, plantImage('Succulents','Haworthia')],
      ["Jade Plant",11, plantImage('Succulents','Jade Plant')],
      ["Sedum",6, plantImage('Succulents','Sedum')],
      ["Crassula",10, plantImage('Succulents','Crassula')]
    ]
  },
  {
    name: 'Flowering',
    plants: [
      ["Peace Lily",15, plantImage('Flowering','Peace Lily')],
      ["African Violet",13, plantImage('Flowering','African Violet')],
      ["Kalanchoe",12, plantImage('Flowering','Kalanchoe')],
      ["Anthurium",20, plantImage('Flowering','Anthurium')],
      ["Begonia",14, plantImage('Flowering','Begonia')],
      ["Orchid (Phalaenopsis)",25, plantImage('Flowering','Orchid Phalaenopsis')]
    ]
  }
];

function plantImage(category, name){
  // map a plant name to a local file under public/assets/plants
  const safe = name.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
  return `/assets/plants/${safe}.jpg`;
}

export default function ProductList(){
  const dispatch = useDispatch();
  const cartItems = useSelector(s => s.cart?.items || []);

  const isInCart = (id) => !!cartItems.find(i=>i.id===id);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {CATEGORIES.map(cat => (
        <section key={cat.name} style={{marginBottom:24}}>
          <h2>{cat.name}</h2>
          <div className="plant-grid">
            {cat.plants.map(([name,price,thumb],idx)=>{
              const id = `${cat.name}-${idx}`;
              const image = thumb || plantImage(cat.name,name);
              return (
                <div className="plant-card" key={id}>
                  <img className="plant-thumb" src={image} alt={name} />
                  <h4>{name}</h4>
                  <div>${price.toFixed(2)}</div>
                  <button className="btn" disabled={isInCart(id)} onClick={()=>handleAdd({id,name,price,thumbnail:image})} style={{marginTop:8}}>
                    {isInCart(id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
