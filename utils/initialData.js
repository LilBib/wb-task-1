export const products = [
    {
        ID: 1,
        isChecked: true,
        image: 'https://i.postimg.cc/xNGv9tWg/shirt.png',
        name: 'Футболка UZcotton мужская',
        parameters: {
            'Цвет': 'белый',
            'Размер': '56',
        },
        warehouse: 'Коледино WB',
        producer: { 
            name: 'OOO Вайлдберриз',
            regNumber: '1067746062449',
            adress: '142181, Московская область, г.о. Подольск, д Коледино, тер. Индустриальный Парк Коледино, д. 6, стр. 1',
        },
        amount: 2,
        left: 73,
        price: 1500,
        discount: 0.45,
        userDiscount: 0.1,
        deliveryDate: {
            '5-6 февраля': 12,
            '7-8 февраля': 61,
        }
    },
    {
        ID: 2,
        isChecked: true,
        image: 'https://i.postimg.cc/vDwxYpWh/case.png',
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        parameters: {
            'Цвет': 'прозрачный',
        },
        warehouse: 'Коледино WB',
        producer: { 
            name: 'OOO Мегапрофстиль',
            regNumber: '5167746237148',
            adress: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        amount: 201,
        left: 200,
        price: 700,
        discount: 0.50,
        userDiscount: 0.1,
        deliveryDate: {
            '5-6 февраля': 164,
            '7-8 февраля': 36,
        },
    },
    {
        ID: 3,
        isChecked: true,
        image: 'https://i.postimg.cc/2LNdpPXV/Pencil.png',
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        warehouse: 'Коледино WB',
        producer: { 
            name: 'OOO Вайлдберриз',
            regNumber: '1067746062449',
            adress: '142181, Московская область, г.о. Подольск, д Коледино, тер. Индустриальный Парк Коледино, д. 6, стр. 1',
        },
        amount: 30,
        left: 25,
        price: 2500,
        discount: 0.53,
        userDiscount: 0.1,
        deliveryDate: {
            '5-6 февраля': 25,
        },
    },
]
export const missingProducts = [
    {
        ID: '1m',
        image: 'https://i.postimg.cc/xNGv9tWg/shirt.png',
        name: 'Футболка UZcotton мужская',
        parameters: {
            'Цвет': 'белый',
            'Размер': '56',
        },
    },
    {
        ID: '2m',
        image: 'https://i.postimg.cc/vDwxYpWh/case.png',
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        parameters: {
            'Цвет': 'прозрачный',
        },
    },
    {
        ID: '3m',
        image: 'https://i.postimg.cc/2LNdpPXV/Pencil.png',
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    },
]
export const cards = [
    {
        'image': 'https://sun9-west.userapi.com/sun9-71/s/v1/ig2/nC5P3x1Yp0INcewi4EWoYkHPtOBihts2sIy18jvHELKDH_3prlOYHYFFEanhniGcHPEH3TNDInAAN9HYXxq3z5z6.jpg?size=32x24&quality=96&type=album',
        'number': '1234 56•• •••• 1234',
        'date': '01/30'
    },    
    {
        'image': 'https://sun9-north.userapi.com/sun9-81/s/v1/ig2/1IqO7A0A7plz7adPevz7KdTA_mTiyq5R_decuxGdVol7jWoFx2YBeO8ZV4ah1TKB_Jvuy02KmzJIeliK9JPmZdzm.jpg?size=32x25&quality=96&type=album',
        'number': '2345 56•• •••• 1234',
        'date': '02/57'
    },    
    {
        'image': 'https://sun1.userapi.com/sun1-21/s/v1/ig2/mj_rGQjbHosiNmYW5v1NtyHKkIl5M0YgeDjerm22LoJRG_b570rLDizNLi9rctke8ZXG1UkkrQRbAt52nYOTym1K.jpg?size=32x25&quality=96&type=album',
        'number': '3456 56•• •••• 1234',
        'date': '03/27'
    },    
    {
        'image': 'https://sun9-east.userapi.com/sun9-73/s/v1/ig2/rrRkG34-kGYhnWVs90I6H1nm1k5KKoaiz6Fpexo538GWVN0T4t7V-yPfAaTqPlv4_qsfvKYvDMCyPqfp68MML2gB.jpg?size=32x25&quality=96&type=album',
        'number': '4567 56•• •••• 1234',
        'date': '04/33'
    },
]
export const deliveryAdresses = [
    'Бишкек, улица Табышалиева, 57',
    'Бишкек, улица Жукеева-Пудовкина, 77/1',
    'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
]
export const franchiseAdresses = [
    {
        adress: 'Бишкек, улица Табышалиева, 57',
        rating: '4.73',
        openHours: '10',
        closeHours: '21',
    },    
    {
        'adress': 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
        'rating': '4.99',
        'openHours': '12',
        'closeHours': '21',
    },   
    {
        'adress': 'Бишкек, улица Жукеева-Пудовкина, 77/1',
        'rating': '4.69',
        'openHours': '10',
        'closeHours': '23',
    },
]