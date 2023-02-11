import { Request, Response} from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req:Request,res:Response)
{
  try
  {
    const { orderId } = req.params;
    const {status } = req.body;

    const hasStatus = !['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status);

    if(hasStatus)
    {
      return res.status(400).json({
        error: 'Status should be one of these WAITING , IN_PRODUCTION , DONE '
      });
    }

    await Order.findByIdAndUpdate(orderId, {status});
    res.sendStatus(204);
  }
  catch
  {
    res.sendStatus(500);
  }
}