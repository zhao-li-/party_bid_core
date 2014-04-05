function Bidding(sms_json){
    var phone =sms_json.messages[0].phone;
    var price = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.phone =phone;
    this.price = price;
}
Bidding.create_new_bid =function(activity_id){
    var activity = Activity.get_this_activity(activity_id);
    var count = activity.bids.length +1;
    var bid = "竞价"+count;
    var activities = Activity.get_activities();
    _.map(activities,function(value, key){
        if(key ==activity_id){
            value.bids.push(bid);
            value.biddings[bid]=[];
        }
    })
    localStorage.setItem("activities",JSON.stringify(activities));
}
Bidding.prototype.save_bidding = function(){
    var bidding = this;
    var bid = Activity.get_current_bid();
    var activities = Activity.get_activities();
    _.map(activities,function(value,key){
        if(key == Activity.get_current_activity()){
            value.biddings[bid].push(bidding);
        }
    })
    localStorage.setItem("activities",JSON.stringify(activities));
}
Bidding.not_on_bidding =function(){
    var is_bidding =localStorage.is_bidding;
    if(is_bidding== "false"||is_bidding== ""||!is_bidding){
        return true;
    }
}
Bidding.prototype.has_bid = function(){
    var phone=this.phone;
    if(_.find(Activity.get_current_biddings_in_activity(),function(bidding){
        return bidding.phone ==phone;
    })){
        return true;
    }
}
Bidding.process_bidding_sms =function(sms_json){
    var bidding = new Bidding(sms_json);
    if(Bidding.not_on_bidding()){
        return true;
    }
    if(!SignUp.has_signed(sms_json)){
        return;
    }
    if(bidding.has_bid()){
        return;
    }
    bidding.save_bidding();
}