import axios from 'axios'
import * as urls from '../utils/urls';
// will need a way to get uid for this 
export function getUserFavorites(uid,player){
    let favorites=[]
    axios.post(urls.getFavorites,{
        uid:uid
    })
    .then(response =>{
        console.log(response.data.favorites)
       
        let ids = response.data.favorites
        let i=0
        for(i=0;i<ids.length;i++){
            console.log(ids[i].pga_id)
            
            
            let favoritepush= player.filter(player=>player.player_id == ids[i].pga_id)
            if (favoritepush.length > 0){
                favorites.push(favoritepush)

            }
           
            console.log(favoritepush)
            
            return favorites

            
        }
    //    this.setState({
    //        favorites:favorites

    //    })
    //    this.props.onFavSelected(this.state.favorites)

   
    })
   // console.log("this is outside",favorites)
}