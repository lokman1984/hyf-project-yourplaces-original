import React from 'react';
import UserList from '../conponents/UsersList';
const USERS = ()=>{
    const Users =[{id:'ul',
    name:'Lokman',
    image:'https://ionicframework.com/blog/wp-content/uploads/2019/02/react-beta.png',
    places:3}]
return <UserList items={USERS}/>
}



export default Users;