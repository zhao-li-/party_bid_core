function Activity(activity_name) {
    this.id = Activity.get_activity_id_generator();
    this.name = activity_name;
}
Activity.get_activity_id_generator = function () {
    return localStorage.activity_id_generator
}
Activity.get_activities = function () {
    return JSON.parse(localStorage.activities);
}
Activity.get_current_activity_id = function () {
    return localStorage.current_activity;
}
Activity.prototype.create = function () {
    var activities = Activity.get_activities();
    activities.push(this);
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.current_activity = this.id;
    localStorage.activity_id_generator = parseInt(Activity.get_activity_id_generator()) + 1;
}
Activity.get_fore_two_string = function (sms_json) {
    return sms_json.messages[0].message.replace(/\s/g, "").substring(0, 2).toUpperCase();
}