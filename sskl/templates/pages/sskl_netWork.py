#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe import _
from iot.hdb import iot_device_tree, iot_device_cfg

# from Jinja2 import Template ;
def get_context(context):
	context.title=_("网络监测—实时数据");
	name = frappe.form_dict.code
	if name:
		doc = frappe.get_doc("Cell Station", name)
	symlink_type = frappe.db.get_single_value('Cell Station Settings', 'symlink_device_type')
	sn = None
	for dev in doc.devices:
		if dev.device_type == symlink_type:
			sn = dev.device_id
	if sn:
		context.vsn = iot_device_tree(sn)
		context.sn = sn
		context.symlink_status = frappe.get_doc("IOT Device", sn).device_status
		doc.status = frappe.get_doc("IOT Device", sn).device_status
		doc.symlink_sn = sn
	else:
		context.vsn = []
		context.sn = 'UNKNOWN'
		context.symlink_status = 'UNKNOWN'
		doc.status = 'UNKNOWN'
		doc.symlink_sn = 'UNKNOWN'



	context.doc = doc
	context.title = _('S_Station_List')
	context.Station_name = doc.station_name


