function Activity(activity_name) {
    this.name = activity_name
    this.sign_ups = []
    this.bids = []
}
Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities);
    activities.unshift(this);
    localStorage.setItem("activities", JSON.stringify(activities));
}
Activity.prototype.active = function () {
    localStorage.current_activity = this.name;
}
Activity.get_activities = function () {
    return JSON.parse(localStorage.activities);
}
Activity.get_active_activity_name = function () {
    return localStorage.current_activity;
}
Activity.get_active_activity = function () {
    return _.find(Activity.get_activities(), function (activity) {
        return activity.name == localStorage.current_activity;
    })
}
Activity.get_this_activity = function (activity_name) {
    return _.find(Activity.get_activities(), function (activity) {
        return activity.name == activity_name;
    })
}
