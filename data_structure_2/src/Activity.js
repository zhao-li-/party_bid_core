function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}
Activity.get_activities = function(){
    return JSON.parse(localStorage.getItem("activities")) || {};
}
Activity.get_activity_ids = function(){
    return JSON.parse(localStorage.activity_ids) ||[];
}
Activity.get_activity_id_generator = function(){
    return parseInt(localStorage.activity_id_generator) ;
}
Activity.prototype.create = function () {
    var activities = Activity.get_activities();
    var count =Activity.get_activity_id_generator();
    activities[count] = this;
    localStorage.setItem("activities", JSON.stringify(activities));
    var activity_ids = Activity.get_activity_ids();
    activity_ids.push(count.toString());
    localStorage.setItem("activity_ids",JSON.stringify(activity_ids));
    localStorage.current_activity = count;
    localStorage.activity_id_generator = count+1;
}
Activity.get_fore_two_string = function (sms_json) {
    return sms_json.messages[0].message.replace(/\s/g, "").substring(0, 2).toUpperCase();
}
Activity.get_current_activity = function(){
    return localStorage.current_activity;
}
Activity.get_this_activity=function(activity_name){
    var activities = Activity.get_activities();
    return activities[activity_name];
}
Activity.get_current_bid = function(){
    return localStorage.current_bid;
}
Activity.get_current_biddings_in_activity = function(){
    var bid = Activity.get_current_bid();
    return Activity.get_this_activity(Activity.get_current_activity()).biddings[bid];
}