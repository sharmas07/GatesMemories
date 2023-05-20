const followedByUserEmail = (followedUser, followedByUser) =>{
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Follower Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          padding: 20px;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 40px;
        }
        .container > img{
            margin-left: 14rem;
        }
        h1 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333333;
        }
    
        p {
          font-size: 16px;
          line-height: 1.5;
          color: #555555;
        }
    
        .button {
          display: inline-block;
          background-color: black;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 3px;
          margin-top: 20px;
        }
    
        .button:hover {
          background-color: #45a049;
        }
    
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: #999999;
        }
        .btn-text{
            margin:1px;
            color:#fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src='https://res.cloudinary.com/duaob0aso/image/upload/v1684333607/EmailBodyLogo_roqdm5.png' width='150px' height='150px' />
        <h1>New Follower Notification</h1>
        <p>Hiee ${followedUser},</p>
        <p>You have a new follower on GatesMemories.<b>${followedByUser}</b> decided to follow you.</p>
        <p>Stay connected with your peers, share updates, and engage with your community. Remember, great things are achieved together!</p>
        <a href="https://gates-memories.vercel.app/" class="button"><p class='btn-text' >Visit Your Profile</p></a>
        <div class="footer">
          <p>This email is sent automatically. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>`
}

export default followedByUserEmail