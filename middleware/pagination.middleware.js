module.exports = (req, res, next) => {
  let page = 1;
  if(req.query.page > 1) {
      page = parseInt(req.query.page);
  }
  const numOfProduct = 8;
  const start = (page - 1) * numOfProduct;
  const end = page * numOfProduct;
  
  res.locals.currentPage = page;
  res.locals.startPage = start;
  res.locals.endPage = end;
  
  next();
}