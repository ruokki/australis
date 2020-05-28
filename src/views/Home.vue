<template>
  <div>
    <div class="row">
      <div class="col">
        <q-table
          title="Demandes en attente"
          dense
          :data="lends"
          :columns="lendCols"
          row-key="borrow_id"
        />
      </div>
      <div class="col">
        <q-table
          title="Emprunts en cours"
          dense
          :data="borrows"
          :columns="borrowCols"
          row-key="borrow_id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Home',
  data() {
    return {
      lendCols: [
        { name: "item", label: "Item", field: "item_name"  },
        { name: "lender", label: "Possesseur", field: "user_name"  },
        { name: "duration", label: "Durée", field: "borrow_duration",  format: (val) =>  val + " jour" + (val > 1 ? "s" : "" ) },
      ],
      borrowCols: [
        { name: "item", label: "Item", field: "item_name"  },
        { name: "lender", label: "Possesseur", field: "user_name"  },
        { name: "end", label: "Fin", field: "borrow_date_end", format: (val) => moment(val).format('DD/MM/YYYY') }
      ],


      lends: [
        {
          borrow_id: 1,
          item_name: "Truc du truc",
          user_name: "Jean Michel",
          borrow_duration: 20
        },
        {
          borrow_id: 2,
          item_name: "Album de truc",
          user_name: "Jean Guy",
          borrow_duration: 10
        },
        {
          borrow_id: 3,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 20
        },
        {
          borrow_id: 4,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 20
        },
        {
          borrow_id: 5,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 1
        },
      ],
      borrows: [
        {
          borrow_id: 1,
          item_name: "Truc du truc",
          user_name: "Jean Michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 2,
          item_name: "Album de truc",
          user_name: "Jean Guy",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 3,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 4,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 5,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
      ],
    }
  }
}
</script>