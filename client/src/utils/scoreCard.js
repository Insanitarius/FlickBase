import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
} from "@material-ui/core";

import MovieIcon from "@material-ui/icons/Movie";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";

const ScoreCard = ({ current }) => {
  console.log(current);
  return (
    <List className="scorecard">
      {/* Score */}
      <ListItem>
        <ListItemAvatar className="mt-2">
          <Avatar className="mt-2">
            <StarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Our Score"
          secondary={current.score}
          className="rating"
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      {current.category && current.category.name ? (
        <div>
          {/* Categories */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ListIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Category"
              secondary={current.category.name}
              className="category"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ) : null}

      {/* Actor */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <div>
          {current.actors.map((item, index) => (
            <Chip
              key={`${index + item}`}
              item={item}
              label={item}
              clickable
              color="primary"
              className="chip"
            />
          ))}
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />

      {/* Director */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MovieIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Director"
          secondary={current.director}
          className="director"
        />
      </ListItem>
    </List>
  );
};

export default ScoreCard;
