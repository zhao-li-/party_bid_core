function SignUp(sms_json) {
    var name = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.name = name;
    this.phone = sms_json.messages[0].phone;
}
SignUp.prototype.save_sign_up = function () {
    var sign_up = this;
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        if (activity.id == Activity.get_current_activity()) {
            activity.sign_ups.push(sign_up);
        }
    })
    localStorage.setItem("activities", JSON.stringify(activities));
}
SignUp.has_signed = function (sms_json) {
    if (_.find(Activity.get_this_activity(Activity.get_current_activity()).sign_ups, function (sign_up) {
        return sign_up.phone == sms_json.messages[0].phone;
    })) {
        return true;
    }
}
SignUp.not_signing_up = function () {
    var is_signing_up = localStorage.is_signing_up;
    if (is_signing_up == "false" || is_signing_up == "" || !is_signing_up) {
        return true;
    }
}
SignUp.render_sign_ups = function (activity_name) {
    var activity = _.find(Activity.get_activities(), function (activity) {
        return activity.name == activity_name;
    })
    return activity.sign_ups;
}
SignUp.process_sign_up_sms = function (sms_json) {
    if (SignUp.has_signed(sms_json)) {
        return;
    }
    if (SignUp.not_signing_up()) {
        return;
    }
    var sign_up = new SignUp(sms_json);
    sign_up.save_sign_up();
}