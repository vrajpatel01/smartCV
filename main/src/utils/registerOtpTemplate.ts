export default (otp: number, email: string): string => (`
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .main {
            background: #EFF2F3;
            padding: 50px;
        }

        .container {
            max-width: 600px;
            border-radius: 3px;
            overflow: hidden;
        }

        .content {
            background: white;
            padding: 20px;
            text-align: left;
            font-family: Arial, Helvetica, sans-serif;
            color: #575757;
            border-bottom: 1px solid #e0e0e0;
        }

        .otp {
            font-size: 35px;
            color: #575757;
            font-weight: bold;
            letter-spacing: 10px;
        }

        .bodyText p {
            line-height: 23px;
        }

        .footer-text {
            margin-top: 50px !important;
            font-size: 14px;
            text-transform: capitalize;
            color: #939393;
        }

        .userEmail {
            font-weight: bold;
            color: #393ede;
            font-weight: normal;
        }

        @media screen and (max-width: 600px) {
            .main {
                padding: 20px;
            }

            .info {
                max-width: 100%;
                padding: 20px 10px;
                font-size: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="main">
        <center>
            <div class="container">
                <div class="content">
                    <center>
                        <h2>Let's sign you up</h2>
                        <div class="bodyText">
                            <p>Use this code to sign up to NodeLink <br>
                            This OTP is expire in 5 minutes.</p>
                        </div>
                        <h3 class="otp">${otp}</h3>
                        <div class="bodyText">
                            <p>This code will securely sign you up using</p>
                            <p class="userEmail">${email}</p>
                        </div>
                        <p class="footer-text">if you don't request this OTP, you can safely ignore it.</p>
                    </center>
                </div>
            </div>
        </center>
    </div>
</body>

</html>`)