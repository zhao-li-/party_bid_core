function Bidding(sms_json){
    this.phone = sms_json.messages[0].phone;
    this.price =sms_json.messages[0].message.replace(/\s/g, "").substring(2);
}
Bidding.not_on_bidding = function () {
    var is_bidding = localStorage.is_bidding;
    if (is_bidding == "false" || is_bidding == "" || !is_bidding) {
        return true;
    }
}
Bidding.prototype.has_bid = function(){
    var phone = this.phone;
    if(_.find(Bid.get_current_biddings(),function(bidding){
        return bidding.phone == phone;
    })){
        return true;
    }
}
Bidding.process_bidding_sms = function(sms_json){
    var bidding = new Bidding(sms_json);
    if (Bidding.not_on_bidding()) {
        return true;
    }
    if(!SignUp.has_signed(sms_json)){
        return;
    }
    if (bidding.has_bid()) {
        return;
    }
    var bids = Bid.get_bids();
    _.map(bids,function(bid){
        if(bid.activity_id ==Activity.get_current_activity_id()&&bid.name == Bid.get_current_bid()){
            bid.biddings.push(bidding);
        }
    })
    localStorage.setItem("bids",JSON.stringify(bids));
}