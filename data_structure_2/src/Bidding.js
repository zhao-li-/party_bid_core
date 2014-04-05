function Bidding(){}
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
Bidding.process_bidding_sms =function(sms_json){}