import React from 'react';
import './UserList.css';
import UserItem from './UserItem';

const UsersList = props =>{
    if(props.items.length===0){
        return(
            <div className="center">
                <h2>no user found</h2>
            </div>
        )
    }
return <ul>
    {props.items.map(user=>{
        <UserItem key={user.id} 
        id={user.id} 
        image={user.image} 
        name={user.name}
         PlaceCount={user.Places}/>
    })}
</ul>
}

export default UsersList;