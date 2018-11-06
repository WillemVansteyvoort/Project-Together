<html>
<head>
    <title>dfdf</title>
    <style>
        .mail {
            background-color: #F2F2F2;
            color: black;
        }
        .mail-content {
             background-color: white;
             padding: 40px 30px;
             margin: 10% 20%;
         }

        .mail-title {
             font-size: 30px;
             text-align: center;
         }
        .button {
            text-decoration: none;
            display: inline-block;
            text-align: center;
            padding: 9px;
            color: white;
        }
        .button-primary {
             background-color: #5680e9;
         }
        h1 {
            color: black;
        }
        b {
            color: black;
        }
        p {
            color: black;
        }
    </style>
</head>
<body class="mail">
<div class="mail-content">
    <h1 class="mail-title">Welcome to Project-Together</h1>
    <p>
        Hi <b>{{$name}}</b></p> <p> We are very happy that you have chosen for us to register your company <b>{{$company}}</b> on Project-Together.com. Because we want to avoid abuse, we ask you to activate your account. You can do it by clicking on the button below.

    </p>
    <a class="button button-primary">Verify account</a>
    <p>
        Thanks and enjoy
    </p>
    <p>
        The Project-Together team
    </p>
</div>
</body>
</html>