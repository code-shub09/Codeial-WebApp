module.exports.home=function(req,res){
    // return res.send('<h1>Express is up for codeial</h1>')
    
    /*When a cookie is set by a server and stored in the browser, the browser automatically includes that cookie in
     subsequent requests to the same domain. This allows the server to recognize and identify the user, maintain session state, 
     or retrieve any other information associated with the cookie.

    The browser sends cookies back to the server by including them in the HTTP request headers. Specifically, 
    cookies are sent in the Cookie header of the HTTP request.
    */
    console.log(req.cookies);

    //sending sessionID stored in cookies to the browser 
    res.cookie('user_sessionID',25);

    
    return res.render('home',{
        title:'Home'
    });
}