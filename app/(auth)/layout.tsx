


export default function AuthPageLayout(
    { children } : { children: React.ReactNode }
){
    return(
        <html lang="en">
            <body>
                { children }
            </body>
        </html>
    )
}