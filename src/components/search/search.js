import React, { Fragment } from "react";
import Downshift from "downshift";

import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css
} from "./styles";
import Fetch from "../fetch";
import Commits from "./commits";
import Card from "../repository-card";

const baseEndpoint = "https://api.github.com/search/repositories";

class Search extends React.Component {
  render() {
    const { Authorization } = this.props;
    return (
      <Downshift
        itemToString={item => (item ? item.full_name : "")}
        defaultInputValue={"facebook/react"}
      >
        {({
          inputValue,
          getInputProps,
          getLabelProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,
          selectedItem,
          highlightedIndex,
          isOpen,
          clearSelection
        }) => {
          return (
            <div
              {...css({
                width: "36rem",
                margin: "auto",
                position: "relative"
              })}
            >
              <Label {...getLabelProps()}>Select a Github repository</Label>
              <div {...css({ position: "relative" })}>
                <Input
                  {...getInputProps({
                    isOpen,
                    placeholder: "facebook/react"
                  })}
                />
                {selectedItem ? (
                  <ControllerButton
                    onClick={clearSelection}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </ControllerButton>
                ) : (
                  <ControllerButton {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <Menu {...getMenuProps({ isOpen })}>
                {(() => {
                  if (!isOpen) {
                    return null;
                  }

                  if (!inputValue) {
                    return (
                      <Item disabled>You have to enter a search query</Item>
                    );
                  }

                  return (
                    <Fetch
                      url={baseEndpoint}
                      params={{ q: inputValue }}
                      headers={{
                        Authorization,
                        Accept: "application/vnd.github.v3.text-match+json"
                      }}
                    >
                      {({
                        loading,
                        error,
                        data: {
                          items = [],
                          text_matches: textMatches = []
                        } = {}
                      }) => {
                        if (loading) {
                          return <Item disabled>Loading...</Item>;
                        }

                        if (error) {
                          return <Item disabled>Error! ${error}</Item>;
                        }

                        if (!items.length) {
                          return <Item disabled>No repositories found</Item>;
                        }

                        return items.map((item, index) => (
                          <Item
                            key={item.id}
                            {...getItemProps({
                              item: item,
                              index,
                              isActive: highlightedIndex === index,
                              isSelected:
                                selectedItem && selectedItem.id === item.id
                            })}
                          >
                            {item && item.full_name}
                          </Item>
                        ));
                      }}
                    </Fetch>
                  );
                })()}
              </Menu>
              {selectedItem ? (
                <Fragment>
                  <h1>Repository</h1>
                  <Card
                    fullName={selectedItem.full_name}
                    externalLink={selectedItem.html_url}
                    updatedAt={selectedItem.updated_at}
                  />
                  <h1>Commits</h1>
                  <Commits
                    Authorization={Authorization}
                    owner={selectedItem.full_name.split("/")[0]}
                    repo={selectedItem.full_name.split("/")[1]}
                  />
                </Fragment>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default Search;
