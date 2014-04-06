function Bid (activity_id){
    var count = Bid.get_this_bids(activity_id).length +1;
    this.name = "竞价" + count;
    this.activity_name = activity_id;
    this.biddings = [];
}
Bid.get_bids = function(){
    return JSON.parse(localStorage.bids);
}
Bid.get_current_bid = function(){
    return localStorage.current_bid;
}
Bid.get_current_biddings = function(){
    var bid = _.find(Bid.get_bids(),function(bid){
        return bid.activity_id ==Activity.get_current_activity_id()&&bid.name == Bid.get_current_bid();
    })
    return bid.biddings;
}
Bid.get_this_bids = function(activity_id){
    return _.filter(Bid.get_bids(),function(bid){
        return bid.activity_name == activity_id;
    })
}
Bid.create_new_bid = function(activity_id){
    var bids = Bid.get_bids();
    var bid = new Bid(activity_id);
    bids.push(bid);
    localStorage.setItem("bids",JSON.stringify(bids));
}