import React from 'react';

import '../styles/group';

import GroupPopover from '../components/GroupPopover';


class Group extends React.Component {


  render() {
    return(
    <div>

      <p>Each group has its own popup. Specify a name as <code>group</code> prop. </p>
      <GroupPopover id={'parent1'} group='group1'  style={{position: 'absolute', top: '320px', left: '5%'}}></GroupPopover>
      <GroupPopover id={'parent2'} group='group1'  style={{position: 'absolute', top: '420px', left: '5%'}}></GroupPopover>
      <GroupPopover id={'parent3'} group='group1'  style={{position: 'absolute', top: '520px', left: '5%'}}></GroupPopover>

      <GroupPopover id={'parent4'} group='group2'  style={{position: 'absolute', top: '320px', right: '5%'}}></GroupPopover>
      <GroupPopover id={'parent5'} group='group2'  style={{position: 'absolute', top: '420px', right: '5%'}}></GroupPopover>
      <GroupPopover id={'parent6'} group='group2'  style={{position: 'absolute', top: '520px', right: '5%'}}></GroupPopover>
      <GroupPopover id={'parent7'} group='group2'  style={{position: 'absolute', top: '620px', right: '5%'}}></GroupPopover>

    </div>
    );
  }


}

export default Group;
