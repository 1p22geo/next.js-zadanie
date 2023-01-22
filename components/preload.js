import React from 'react';
class preload extends React.Component {
    render() { 
        return ( <></> );
    }
    componentDidMount(){
        fetch('http://localhost:3000/api/reserve_seat')
    }
}
 
export default preload;