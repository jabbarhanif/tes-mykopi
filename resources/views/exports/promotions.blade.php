<table>
    <thead>
        <tr>
            <th>Tanggal</th>
            <th>Outlet</th>
            <th>Jenis Promo</th>
            <th>Deskripsi</th>
            <th>Pengunjung</th>
            <th>Status</th>
            <th>Admin Note</th>
        </tr>
    </thead>
    <tbody>
        @foreach($promotions as $p)
        <tr>
            <td>{{ $p->promo_date }}</td>
            <td>{{ $p->outlet->name ?? '-' }}</td>
            <td>{{ $p->promo_type }}</td>
            <td>{{ $p->description }}</td>
            <td>{{ $p->estimated_traffic }}</td>
            <td>{{ $p->status }}</td>
            <td>{{ $p->admin_note }}</td>
        </tr>
        @endforeach
    </tbody>
</table>