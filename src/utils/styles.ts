import { Theme, StyleRulesCallback } from "@material-ui/core";

export const styles: StyleRulesCallback<Theme, {}> = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroUnit: {
    paddingTop: 10,
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 800,
    margin: "0 auto",
    minHeight: 400,
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing(8)}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  textField: {
    width: 400
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  addThingForm: {
    width: 400
  },
  cardTitle: {
    marginBottom: 16,
    fontSize: 14
  }
});
