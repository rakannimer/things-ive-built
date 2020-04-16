import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import { Thing } from "../schema/types";
import { UrlPreview } from "./UrlPreview";
import { useStyles } from "../utils/styles";
import { Separator } from "./Separator";
import { getFirebasePath } from "../utils/get-firebase-path";
import Fab from "@material-ui/core/Fab";
import { getIsomorphicUseObjectVal } from "src/hooks/use-object-val";
import { getFirebaseDatabase } from "src/utils/get-firebase";

type UserAvatarProps = { photo_url: string; username: string };

export const UserAvatar = ({ photo_url, username }: UserAvatarProps) => {
  return (
    <div style={{ display: "flex" }}>
      <Avatar src={photo_url} style={{ width: 20, height: 20 }} />
      <Separator space={5} horizontal />
      <Typography variant="h5" color="textSecondary">
        {username}
      </Typography>
    </div>
  );
};

export const ThingPreview = ({
  thingId,
  thingData,
  onDelete = async (thingId) => {},
  showDelete = true,
}: {
  thingId: string;
  thingData: Thing;
  onDelete?: (thingId: string) => void;
  showDelete?: boolean;
}) => {
  const classes = useStyles();
  const {
    // created_on,
    name,
    // tags,
    release_date,
    types,
    description,
    main_url,
    author_id,
  } = thingData;
  const releaseDate = new Date(release_date as number);
  const date = `${releaseDate.toLocaleDateString()} ${releaseDate.toLocaleTimeString()}`;
  const useObjectVal = getIsomorphicUseObjectVal();
  const ref = getFirebaseDatabase().ref(
    getFirebasePath(`users_public/${author_id}`)
  );
  const [user] = useObjectVal<UserAvatarProps>(ref);

  return (
    <React.Fragment>
      <Card style={{ width: 500 }} data-testid="thing-preview">
        <CardContent>
          <Typography className={classes.cardTitle} color="textSecondary">
            {date}
          </Typography>
          <Typography variant="h5">{name}</Typography>
          <Separator space={15} vertical />
          <React.Fragment>
            <Separator space={5} vertical />
            {user && (
              <UserAvatar photo_url={user.photo_url} username={user.username} />
            )}
            <Separator space={5} vertical />
          </React.Fragment>
          <Separator vertical space={10} />
          <React.Fragment>
            {types &&
              Object.keys(types).map((type) => (
                <Chip
                  label={type}
                  key={type}
                  style={{ marginRight: 10 }}
                  color="primary"
                />
              ))}
          </React.Fragment>
          <Separator vertical space={20} />
          <div>
            <Typography>{description}</Typography>
          </div>
          <Separator vertical space={5} />
          <Separator vertical space={20} />
          <UrlPreview url={main_url} />
        </CardContent>
        {showDelete && (
          <CardActions>
            <Fab
              aria-label="Delete"
              color="secondary"
              data-testid={"delete-thing"}
              onClick={() => {
                onDelete(thingId);
              }}
            >
              <DeleteIcon />
            </Fab>
            <Separator vertical space={10} />
          </CardActions>
        )}
      </Card>
    </React.Fragment>
  );
};
