import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';

import { EMBLEM } from 'app/lib/destinyEnums';
import getItemExtraInfo from 'app/lib/getItemExtraInfo';
import Objectives from 'app/components/Objectives';
import ItemBanner from 'app/components/ItemBanner';

import {
  makeItemSelector,
  objectiveDefsSelector,
  statDefsSelector,
  makeItemStatsSelector,
  profileObjectivesSelector,
  makeItemInventoryEntrySelector
} from 'app/store/selectors';

import styles from './styles.styl';

class ItemModalContent extends Component {
  render() {
    const {
      trackOrnament,
      onRequestClose,
      item,
      itemInventoryEntry,
      profileObjectives,
      objectiveDefs
    } = this.props;

    const { hash, displayProperties, screenshot, itemCategoryHashes } = item;

    const dtrLink = `http://db.destinytracker.com/d2/en/items/${hash}`;

    const isEmblem = (itemCategoryHashes || []).includes(EMBLEM);
    const extraInfo = getItemExtraInfo(item, itemInventoryEntry);

    const objectiveHashes = [
      item.emblemObjectiveHash,
      ...((item.objectives || {}).objectiveHashes || [])
    ].filter(Boolean);

    return (
      <div className={styles.root}>
        <button className={styles.close} onClick={onRequestClose}>
          <i className="fa fa-close" />
        </button>

        {screenshot && (
          <div className={styles.screenshotWrapper}>
            <img
              className={styles.screenshot}
              src={`https://bungie.net${screenshot}`}
              alt=""
            />
          </div>
        )}

        <ItemBanner className={styles.itemTop} item={this.props.item} />

        {displayProperties.description && (
          <p className={styles.description}>{displayProperties.description}</p>
        )}

        <ul className={styles.viewItemLinks}>
          <li>
            <a href={dtrLink} target="_blank" rel="noopener noreferrer">
              View on DestinyTracker
            </a>
          </li>

          <li>
            <Link to={`/data/${hash}`}>View in Data Explorer</Link>
          </li>
        </ul>

        {objectiveHashes.length ? (
          <div>
            <h3 className={styles.objectiveTitle}>
              Complete Objectives to Unlock
            </h3>

            <Objectives
              className={styles.objectives}
              trackedStatStyle={isEmblem}
              objectives={objectiveHashes}
              profileObjectives={profileObjectives}
              objectiveDefs={objectiveDefs}
            />

            <button
              className={styles.button}
              onClick={() => trackOrnament(hash)}
            >
              Track objective progress
            </button>
          </div>
        ) : null}

        {extraInfo.map((info, index) => (
          <div key={index} className={styles.extraInfo}>
            {info}
          </div>
        ))}
      </div>
    );
  }
}

const MODAL_STYLES = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    position: 'static',
    background: 'none',
    border: 'none'
  }
};

function ItemModalWrapper({ isOpen, onRequestClose, ...props }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={MODAL_STYLES}
    >
      {props.item && (
        <ItemModalContent
          {...props}
          onRequestClose={onRequestClose}
          trackOrnament={() => console.log('TODO: Track ornament')}
        />
      )}
    </Modal>
  );
}

const mapStateToProps = () => {
  const itemStatsSelector = makeItemStatsSelector();
  const itemSelector = makeItemSelector();
  const itemInventoryEntrySelector = makeItemInventoryEntrySelector();

  return (state, ownProps) => {
    return {
      profileObjectives: profileObjectivesSelector(state),
      objectiveDefs: objectiveDefsSelector(state),
      statDefs: statDefsSelector(state),
      stats: itemStatsSelector(state, ownProps),
      item: itemSelector(state, ownProps),
      itemInventoryEntry: itemInventoryEntrySelector(state, ownProps)
    };
  };
};

export default connect(mapStateToProps)(ItemModalWrapper);
