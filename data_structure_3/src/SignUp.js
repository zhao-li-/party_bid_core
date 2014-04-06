function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.phone = sms_json.messages[0].phone;
    this.activity_id = Activity.get_current_activity_id();
}
SignUp.get_sign_ups = function () {
    return JSON.parse(localStorage.sign_ups);
}
SignUp.has_signed = function (sms_json) {
    var phone = sms_json.messages[0].phone;
    if (_.find(SignUp.get_sign_ups(), function (sign_up) {
        return sign_up.phone == phone;
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
SignUp.render_sign_ups = function (activity_id) {
    return _.filter(SignUp.get_sign_ups(), function (sign_up) {
        return sign_up.activity_id == activity_id;
    })
}
SignUp.process_sign_up_sms = function (sms_json) {
    var sign_up = new SignUp(sms_json);
    if (SignUp.has_signed(sms_json)) {
        return;
    }
    if (SignUp.not_signing_up()) {
        return;
    }
    var sign_ups = SignUp.get_sign_ups();
    sign_ups.push(sign_up);
    localStorage.setItem("sign_ups", JSON.stringify(sign_ups));
}