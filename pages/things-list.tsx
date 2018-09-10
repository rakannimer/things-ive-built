import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Page } from "../src/components/Page";
import { ThingsDataLoader } from "../src/components/headless/ThingsDataLoader";
import { Thing } from "../src/schema/types";
import { UrlPreview } from "../src/components/UrlPreview";
import { styles } from "../src/utils/styles";
import { Separator } from "../src/components/Separator";
const s = v => JSON.stringify(v, null, 2);

const ThingPreview = withStyles(styles)(
  ({
    thingId,
    thingData,
    classes
  }: {
    thingId: string;
    thingData: Thing;
    classes: any;
  }) => {
    const date = `${new Date(
      thingData.created_on as number
    ).toLocaleDateString()} ${new Date(
      thingData.created_on as number
    ).toLocaleTimeString()}`;
    return (
      <>
        <Card>
          <CardContent>
            <Typography className={classes.cardTitle} color="textSecondary">
              {date}
            </Typography>
            <Typography variant="headline" component="h2">
              {thingData.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {thingData.tags &&
                thingData.tags.map(tag => <pre key={tag}>{tag}</pre>)}
            </Typography>
            <Typography component="p">{thingData.description}</Typography>
            <UrlPreview url={thingData.main_url} />
            <pre>{s({ thingId, thingData })}</pre>
          </CardContent>
        </Card>
        <Separator vertical space={20} />
      </>
    );
  }
);

const UserThingsListUI = ({ thingsIds, thingsData }) => {
  return (
    <React.Fragment>
      {thingsIds.map((thingId, i) => (
        <ThingPreview
          thingId={thingId}
          thingData={thingsData[i]}
          key={thingId}
        />
      ))}
    </React.Fragment>
  );
};

class ThingsList extends React.Component<{ uid: string }> {
  static getInitialProps = async req => {
    return {
      uid: req.query.uid
    };
  };
  render() {
    const { uid } = this.props;
    return (
      <Page>
        {uid && (
          <ThingsDataLoader uid={uid}>
            {({ thingsIds, thingsData }) => (
              <UserThingsListUI thingsIds={thingsIds} thingsData={thingsData} />
            )}
          </ThingsDataLoader>
        )}
      </Page>
    );
  }
}
export default ThingsList;
