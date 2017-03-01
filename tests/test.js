import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { shallow, mount } from 'enzyme';
import jsdom from 'jsdom';
import expect from 'expect';

// - Import component
import Popover from '../src/index';


describe('Component: index.js', () => {

    let parent;
    let secondParent;

    beforeEach(() => {
        global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
        global.navigator = { userAgent: 'node.js' };

        // - Add two parents to DOM so we can test it 
        parent = document.createElement('button');
        parent.innerHTML = 'parent';
        parent.id = 'parent';
        document.body.appendChild(parent);

        secondParent = document.createElement('button');
        secondParent.innerHTML = 'secondParent';
        secondParent.id = 'secondParent';
        document.body.appendChild(secondParent);
    });

    beforeEach(() => {

        // - Because jsdom doesnt actually rendering anything, so we need to fake getBoundingClientRect
        // - Our component relies on these to position itself 
        parent.getBoundingClientRect = () => ({
            width: 100,
            height: 20,
            top: 30,
            left: 10,
            right: 100,
            bottom: 20,
        });

        secondParent.getBoundingClientRect = () => ({
            width: 100,
            height: 20,
            top: 70,
            left: 90,
            right: 100,
            bottom: 20,
        });

    });

    const minimumProps = {
        open: false,
        parent: '#parent',
        prefix: 'popup',
        timeout: 1000,
        animationTime: 0
    }

    it('mounts correctly', () => {
        // - If length is equal 1 = component rendered correctly 
        expect(shallow(<Popover {...minimumProps} />).length).toEqual(1);
    })

    it('renders to the body', () => {

        const wrapper = mount(<Popover {...minimumProps}> <div>Test</div> </Popover>);
        wrapper.setProps({ open: true });
        expect(wrapper.instance().getNode().innerHTML.indexOf('Test')).toBeGreaterThan(-1);
    });

    it('portal is removed on close');


    it('content changes on parent change', () => {
        const firstPortal = mount(<Popover {...minimumProps} parent='#parent'> <div>parent</div> </Popover>);
        firstPortal.setProps({ open: true });

        const secondPortal = mount(<Popover {...minimumProps} parent='#secondParent'> <div>second-parent</div> </Popover>);

        const node = firstPortal.instance().getNode();

        // - Open and close first portal
        firstPortal.setProps({ open: false });
        secondPortal.setProps({ open: true });

        expect(node.innerHTML).toInclude('second');

    });


    it('translates between nodes', (done) => {

        const firstPortal = mount(<Popover {...minimumProps} parent='#parent'> <div>parent</div> </Popover>);
        firstPortal.setProps({ open: true });

        const secondPortal = mount(<Popover {...minimumProps} parent='#secondParent'> <div>second-parent</div> </Popover>);

        const node = firstPortal.instance().getNode();

        const oldTransform = node.style.transform;

        // - Open and close
        firstPortal.setProps({ open: false });
        secondPortal.setProps({ open: true });

        // - Since scheduleClose() is async 
        setTimeout(() => {
            const currentTransform = node.style.transform;
            expect(oldTransform).toNotEqual(currentTransform);
            done();
        }, minimumProps.timeout + minimumProps.animationTime + 100)
    })
})