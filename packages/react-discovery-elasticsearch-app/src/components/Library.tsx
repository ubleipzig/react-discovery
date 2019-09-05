import {Grid, Typography} from "@material-ui/core"
import React, {ReactElement} from "react"
import {FolderSpecial} from "@material-ui/icons"
import {LibraryFeed} from "./LibraryFeed"
import {SignInButton} from "./SignInButton"
import {useFirebaseAuth} from '@use-firebase/auth'

export const Library: React.FC<any> = (): ReactElement => {
  const {isSignedIn} = useFirebaseAuth()
  return (
    <>{isSignedIn ? <LibraryFeed/> :
      <Grid
        alignItems="center"
        container
        direction="column"
        justify="center"
        spacing={0}
        style={{minHeight: 'calc(100vh - 50%)'}}
      >
        <Grid item style={{margin: 24}} xs={3}>
          <FolderSpecial style={{ fontSize: 120 }}/>
        </Grid>
        <Grid item style={{margin: 24}} xs={3}>
          <Typography>
            Sign in to access workspaces that you have saved
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <SignInButton/>
        </Grid>
      </Grid>}
   </>
  )
}
