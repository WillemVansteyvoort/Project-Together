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
            color: white;
        }
        .button-primary:hover {
            opacity: 0.8;
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
    <h1 class="mail-title">Password recovery</h1>
    <p>
        Hi  {{$name}}</p> <p> You have just asked for a password recovery for your account ({{$company}}). You can recover your password by clicking on the button below.
    </p>
    <a class="button button-primary" href="{{$url}}">Recover password</a>
    <p>
        Thanks
    </p>
    <p>
        The Project-Together team
    </p>
</div>
</body>
</html>