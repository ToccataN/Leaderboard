import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var mode=[ 'recent', 'alltime'];

class Header extends React.Component {
    constructor(){
        super()
    }
    render(){
        return <h2>Free Code Camp Leaderboard</h2>
    }
}


class Leader extends React.Component{
   
    constructor(props){
       super(props);
       this.state = {
           users: [],
           val: props.m
       }
       this.ajax = this.ajax.bind(this);
      
    }
    componentWillReceiveProps(props){
        
        this.setState({val: props.m})
        this.ajax(props.m);
    }
    componentWillMount() {
       
        this.ajax(this.state.val);
        
    }
    ajax(value){
        this.serverRequest = axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/"+value).then((result) => {
            console.log(result.data);
            var leaders = result.data;
            this.setState({
                users: leaders
            });
        });
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    
    render(){
        console.log(this.state, this.props)
        return (
            <div className='container'>
            
             <div className='tbl'>
               <table className="table">
                 <thead>
                   <tr>
                     <th>Name</th>
                     <th>Recent </th>
                     <th>Alltime</th>
                   </tr>
                 </thead>
                 <tbody>
                 {this.state.users.map(function(data, index){
                    return (<tr key={index}><td><img src={data.img} className="img img-thumbnail" width="50"/>{data.username}</td> 
                    <td id='recent'>{data.recent}</td> 
                    <td id='alltime'>{data.alltime}</td></tr>)
                 })}
                 </tbody>
               </table>
             </div>
             </div>
            )
    }
}


class App extends React.Component{
    constructor(){
        super(),
        this.state={val: mode[0]},
        this.onClick= this.onClick.bind(this);
      
    }
    
    onClick(){
       this.setState({val: this.state.val === mode[0]? mode[1] : mode[0]});
    }
    render(){
        return (
            <div>
            <div className='headerdiv'>
              <Header></Header>
              <button  onClick={this.onClick} id='but' >{this.state.val==mode[0]? mode[1] : mode[0]}</button>
              
             </div>
             <div >
               <Leader m={this.state.val} />
             </div>
            </div>
        );
    }
}

export default App;
