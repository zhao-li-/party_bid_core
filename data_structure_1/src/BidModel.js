function bid(activity_name){
    var id=Activity.get_this_activity(activity_name).bids.length +1;
    var name ="竞价"+id;
    this.name = name;
    this.biddings =[];

}
bid.create_new_bid =function(activity_name){
    var new_bid =new bid(activity_name);
    var activities = Activity.get_activities();
    _.map(activities,function(activity){
        if(activity.name==Activity.get_this_activity(activity_name).name){
            activity.bids.unshift(new_bid);
        }
    })
    localStorage.setItem("activities",JSON.stringify(activities));
}