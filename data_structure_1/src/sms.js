function notify_sms_received(sms_json) {
    var fore_two_string = SignUp.get_fore_two_string(sms_json);

    function judge_sms() {
        var judge_sms = {
            BM: function () {
                SignUp.process_sign_up_sms(sms_json);
            },
            JJ: function () {
            }
        }
        if (judge_sms[fore_two_string]) {
            judge_sms[fore_two_string]()
        }
    }

    judge_sms();
}