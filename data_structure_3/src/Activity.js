function Activity (activity_name){
    this.id = Activity.get_activity_id_generator();
    this.name = activity_name;
}
Activity.get_activity_id_generator = function(){
    return localStorage.activity_id_generator
}
Activity.get_activities = function(){
    return JSON.parse(localStorage.activities);
}
Activity.prototype.create = function(){
    var activities = Activity.get_activities();
    activities.push(this);
    localStorage.setItem("activities",JSON.stringify(activities));
    localStorage.current_activity = this.id;
    localStorage.activity_id_generator = parseInt(Activity.get_activity_id_generator())+1;
}