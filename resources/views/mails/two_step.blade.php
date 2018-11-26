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
    <h1 class="mail-title">Two step authentication</h1>
    <p>
        Hi <b>{{$name}}</b></p> <p> you have just logged in. Because Two Factor Authentication is enabled, you must enter a code to get acces. This code can be found below.
    </p>
    <p>{{$code}}</p>
    <p>
        Thanks
    </p>
    <p>
        The Project-Together team
    </p>
</div>
</body>
</html>