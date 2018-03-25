import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { EMBLEM } from 'app/lib/destinyEnums';
import getItemExtraInfo from 'app/lib/getItemExtraInfo';
import FancyImage from 'app/components/FancyImage';
import ItemBanner from 'app/components/ItemBanner';
import ItemStats from 'app/components/ItemStats';
import Objectives from 'app/components/Objectives';

import {
  makeItemSelector,
  objectiveDefsSelector,
  statDefsSelector,
  makeItemStatsSelector,
  profileObjectivesSelector,
  makeItemInventoryEntrySelector
} from 'app/store/selectors';
import styles from './styles.styl';

function ItemTooltip({
  item,
  small,
  dismiss,
  profileObjectives,
  objectiveDefs,
  stats,
  statDefs,
  itemInventoryEntry
}) {
  const { displayProperties, screenshot, itemCategoryHashes } = item;

  const isEmblem = (itemCategoryHashes || []).includes(EMBLEM);
  const extraInfo = getItemExtraInfo(item, itemInventoryEntry);

  const objectiveHashes = [
    item.emblemObjectiveHash,
    ...((item.objectives || {}).objectiveHashes || [])
  ].filter(Boolean);

  return (
    <div className={cx(styles.tooltip, small && styles.small)}>
      <ItemBanner className={styles.header} item={item} onClose={dismiss} />

      <div className={styles.body}>
        {displayProperties.description &&
          displayProperties.description.split('\n').map(para => (
            <p key={para} className={styles.description}>
              {para}
            </p>
          ))}

        {screenshot && (
          <div className={styles.screenshotWrapper}>
            <FancyImage
              className={styles.screenshot}
              src={`https://bungie.net${screenshot}`}
            />
          </div>
        )}

        {stats && <ItemStats stats={stats} statDefs={statDefs} />}

        {objectiveHashes.length ? (
          <Objectives
            className={styles.objectives}
            trackedStatStyle={isEmblem}
            objectives={objectiveHashes}
            profileObjectives={profileObjectives}
            objectiveDefs={objectiveDefs}
          />
        ) : null}

        {extraInfo.map((info, index) => (
          <div key={index} className={styles.extraInfo}>
            {info}
          </div>
        ))}
      </div>
    </div>
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

export default connect(mapStateToProps)(ItemTooltip);
