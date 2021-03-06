/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2014-2017 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 *
 */
define([
    'taoQtiItem/qtiItem/core/interactions/ContainerInteraction',
    'taoQtiItem/qtiItem/core/Element',
    'taoQtiItem/qtiItem/helper/maxScore'
], function(ContainerInteraction, Element, maxScore){
    'use strict';
    var HottextInteraction = ContainerInteraction.extend({
        qtiClass : 'hottextInteraction',
        getChoices : function(){
            return this.getBody().getElements('hottext');
        },
        getChoice : function(serial){
            var element = this.getBody().getElement(serial);
            return Element.isA(element, 'choice') ? element : null;
        },
        getNormalMaximum : function getNormalMaximum(){
            return maxScore.choiceInteractionBased(this);
        }
    });
    return HottextInteraction;
});


