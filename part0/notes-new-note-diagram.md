sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: 302 Location: /exampleapp/notes
    deactivate server
    
    Note right of browser: Browser redirects to Location from response header

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document (text/html)
    deactivate server

    Note right of browser: Browser loads html document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS document (text/css)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JavaScript document (application/javascript)
    deactivate server

    Note right of browser: The browser starts executing the JS code

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: [{ "content": string, "date": string }] (application/json)
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    
