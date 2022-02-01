import React from 'react';

export default function Layout(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <base href='/'></base>
        <link rel='icon' href='images/sogeti.ico' />
        <link rel='stylesheet' href='style/master.css' />
        <title>{props.title}</title>
      </head>
      <body>
        <div id='root'>{props.app}</div>
        <script src='/main.js'></script>
      </body>
    </html>
  );
}
