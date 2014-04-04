function SignUp(sms_json) {
    var name = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.name = name;
    this.phone = sms_json.messages[0].phone;
}
SignUp.get_fore_two_string = function (sms_json) {
    return sms_json.messages[0].message.replace(/\s/g, "").substring(0, 2).toUpperCase();
}
SignUp.has_signed = function (sms_json) {
    var active_activity = Activity.get_active_activity();
    if (_.find(active_activity.sign_ups, function (sign_up) {
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
SignUp.save = function (sms_json) {
    var sign_up = new SignUp(sms_json);
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        if (activity.name == Activity.get_active_activity_name()) {
            activity.sign_ups.unshift(sign_up);
        }
    })
    localStorage.setItem("activities", JSON.stringify(activities));
}
SignUp.process_sign_up_sms = function (sms_json) {
    if (SignUp.has_signed(sms_json)) {
        return;
    }
    if (SignUp.not_signing_up()) {
        return;
    }
    SignUp.save(sms_json);
}