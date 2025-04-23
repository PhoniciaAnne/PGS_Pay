export function statusCounts(bills) {
    return bills.reduce((acc, { status }) => {
      const found = acc.find(x => x.status === status);
      if (found) found.count++;
      else acc.push({ status, count: 1 });
      return acc;
    }, []);
  }
  
  export function revenueByDate(bills) {
    const map = bills.reduce((m, b) => {
      const d = new Date(b.dueDate).toISOString().slice(0,10);
      m[d] = (m[d]||0) + b.amount;
      return m;
    }, {});
    return Object.entries(map)
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([date, total]) => ({ date, total }));
  }
  