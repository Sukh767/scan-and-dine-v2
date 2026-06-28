// backend/src/constants/enums.js

export const ROLES = ['customer', 'restaurant_owner', 'platform_admin'];

export const RESTAURANT_OPERATIONAL_STATUS = ['Open', 'Busy', 'Closed', 'Maintenance'];
export const SUBSCRIPTION_PLANS = ['free', 'basic', 'pro', 'enterprise'];
export const SUBSCRIPTION_STATUS = ['active', 'inactive', 'suspended', 'trial'];

export const TABLE_STATUS = ['available', 'reserved', 'occupied', 'inactive'];

export const SESSION_TYPE = ['dine_in', 'takeaway', 'mixed'];
export const SESSION_STATUS = ['active', 'closed', 'abandoned'];
export const BILL_STATUS = ['open', 'payment_pending', 'paid', 'closed', 'refunded'];

export const ORDER_STATUS = ['pending', 'accepted', 'preparing', 'ready', 'served', 'cancelled'];
export const ORDER_ITEM_STATUS = ['pending', 'preparing', 'ready', 'served'];

export const PAYMENT_METHOD = ['online', 'cash', 'card', 'upi'];
export const PAYMENT_STATUS = ['pending', 'completed', 'failed', 'refunded'];
export const PAYMENT_SOURCE = ['customer_app', 'restaurant_counter', 'upi_qr', 'gateway'];

export const RESERVATION_STATUS = ['pending', 'accepted', 'rejected', 'cancelled', 'completed', 'no_show'];
export const VISIT_TYPE = ['reservation', 'walk_in'];

export const SPICE_LEVEL = ['none', 'mild', 'medium', 'hot', 'extra_hot'];
export const DISCOUNT_TYPE = ['percentage', 'flat'];