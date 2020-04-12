
import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos';


const  PhotoList = (props)  => {

    const results = props.data; 
    const name = props.name; 
    
    let data = results.map( (item) => { 
        return (
          <Photo 
          farmid={item.farm}
          serverid={item.server}
          secret={item.secret}
          id={item.id}
          key={item.id}
        />
         );
      });



  return (
    <div className="photo-container">
        <h2>{name}</h2>
        <ul>
         {
           (results.length > 0)
          ? data
          :<NoPhotos/>
         }
        </ul>
    </div>
  );
}

export default PhotoList;

