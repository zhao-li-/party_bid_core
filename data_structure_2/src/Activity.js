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