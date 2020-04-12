import React from 'react';


function Photo(props) {

  return (
    <li> <img src={`https://farm${props.farmid}.staticflickr.com/${props.serverid}/${props.id}_${props.secret}.jpg`} alt=''></img> </li>
  );
}

export default Photo;