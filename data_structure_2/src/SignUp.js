function SignUp(sms_json){
    var name = sms_json.messages[0].message.replace(/\s/g, "").substring(2);
    this.name = name;
    this.phone = sms_json.messages[0].phone;
}
SignUp.prototype.save_sign_up = function(){
    var sign_up = this;
    var activities = Activity.get_activities();
    _.map(activities,function(activity){
        if(activity.id== Activity.get_current_activity()){
            activity.sign_ups.push(sign_up);
        }
    })
    localStorage.setItem("activities",JSON.stringify(activities));
}
SignUp.prototype.has_signed=function(){
    var phone = this.phone;
    if(_.find(Activity.get_this_activity(Activity.get_current_activity()).sign_ups,function(sign_up){
        return sign_up.phone == phone;
    })){
        return true;
    }
}
SignUp.not_signing_up = function () {
    var is_signing_up = localStorage.is_signing_up;
    if (is_signing_up == "false" || is_signing_up == "" || !is_signing_up) {
        return true;
    }
}
SignUp.process_sign_up_sms =function(sms_json){
    var sign_up = new SignUp(sms_json);
    if(sign_up.has_signed()){
        return;
    }
    if (SignUp.not_signing_up()) {
        return;
    }
    sign_up.save_sign_up();
}