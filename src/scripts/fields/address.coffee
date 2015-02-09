Formbuilder.registerField 'address',

  order: 50

  view: """
    <div class='input-line'>
      <span class='street'>
        <input type='text' value='<%= rf.get(Formbuilder.options.mappings.ADDRESS_VALUE) %>' />
        <label>Address</label>
      </span>
    </div>

    <div class='input-line'>
      <span class='city'>
        <input type='text' value='<%= rf.get(Formbuilder.options.mappings.CITY_VALUE) %>' />
        <label>City</label>
      </span>

      <span class='state'>
        <input type='text' value='<%= rf.get(Formbuilder.options.mappings.STATE_VALUE) %>' />
        <label>State / Province / Region</label>
      </span>
    </div>

    <div class='input-line'>
      <span class='zip'>
        <input type='text' value='<%= rf.get(Formbuilder.options.mappings.ZIPCODE_VALUE) %>' />
        <label>Zipcode</label>
      </span>

      <span class='country'>
        <select>
          <option value='' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == '') ? 'selected="selected"' : ''%>></option>
          <option value='AFG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AFG') ? 'selected="selected"' : '' %>>Afghanistan</option>
          <option value='ALA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ALA') ? 'selected="selected"' : '' %>>Åland Islands</option>
          <option value='ALB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ALB') ? 'selected="selected"' : '' %>>Albania</option>
          <option value='DZA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DZA') ? 'selected="selected"' : '' %>>Algeria</option>
          <option value='ASM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ASM') ? 'selected="selected"' : '' %>>American Samoa</option>
          <option value='AND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AND') ? 'selected="selected"' : '' %>>Andorra</option>
          <option value='AGO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AGO') ? 'selected="selected"' : '' %>>Angola</option>
          <option value='AIA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AIA') ? 'selected="selected"' : '' %>>Anguilla</option>
          <option value='ATA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATA') ? 'selected="selected"' : '' %>>Antarctica</option>
          <option value='ATG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATG') ? 'selected="selected"' : '' %>>Antigua and Barbuda</option>
          <option value='ARG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARG') ? 'selected="selected"' : '' %>>Argentina</option>
          <option value='ARM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARM') ? 'selected="selected"' : '' %>>Armenia</option>
          <option value='ABW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ABW') ? 'selected="selected"' : '' %>>Aruba</option>
          <option value='AUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AUS') ? 'selected="selected"' : '' %>>Australia</option>
          <option value='AUT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AUT') ? 'selected="selected"' : '' %>>Austria</option>
          <option value='AZE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AZE') ? 'selected="selected"' : '' %>>Azerbaijan</option>
          <option value='BHS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BHS') ? 'selected="selected"' : '' %>>Bahamas</option>
          <option value='BHR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BHR') ? 'selected="selected"' : '' %>>Bahrain</option>
          <option value='BGD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BGD') ? 'selected="selected"' : '' %>>Bangladesh</option>
          <option value='BRB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRB') ? 'selected="selected"' : '' %>>Barbados</option>
          <option value='BLR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLR') ? 'selected="selected"' : '' %>>Belarus</option>
          <option value='BEL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BEL') ? 'selected="selected"' : '' %>>Belgium</option>
          <option value='BLZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLZ') ? 'selected="selected"' : '' %>>Belize</option>
          <option value='BEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BEN') ? 'selected="selected"' : '' %>>Benin</option>
          <option value='BMU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BMU') ? 'selected="selected"' : '' %>>Bermuda</option>
          <option value='BTN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BTN') ? 'selected="selected"' : '' %>>Bhutan</option>
          <option value='BOL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BOL') ? 'selected="selected"' : '' %>>Bolivia, Plurinational State of</option>
          <option value='BES' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BES') ? 'selected="selected"' : '' %>>Bonaire, Sint Eustatius and Saba</option>
          <option value='BIH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BIH') ? 'selected="selected"' : '' %>>Bosnia and Herzegovina</option>
          <option value='BWA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BWA') ? 'selected="selected"' : '' %>>Botswana</option>
          <option value='BVT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BVT') ? 'selected="selected"' : '' %>>Bouvet Island</option>
          <option value='BRA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRA') ? 'selected="selected"' : '' %>>Brazil</option>
          <option value='IOT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IOT') ? 'selected="selected"' : '' %>>British Indian Ocean Territory</option>
          <option value='BRN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRN') ? 'selected="selected"' : '' %>>Brunei Darussalam</option>
          <option value='BGR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BGR') ? 'selected="selected"' : '' %>>Bulgaria</option>
          <option value='BFA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BFA') ? 'selected="selected"' : '' %>>Burkina Faso</option>
          <option value='BDI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BDI') ? 'selected="selected"' : '' %>>Burundi</option>
          <option value='KHM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KHM') ? 'selected="selected"' : '' %>>Cambodia</option>
          <option value='CMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CMR') ? 'selected="selected"' : '' %>>Cameroon</option>
          <option value='CAN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CAN') ? 'selected="selected"' : '' %>>Canada</option>
          <option value='CPV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CPV') ? 'selected="selected"' : '' %>>Cape Verde</option>
          <option value='CYM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CYM') ? 'selected="selected"' : '' %>>Cayman Islands</option>
          <option value='CAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CAF') ? 'selected="selected"' : '' %>>Central African Republic</option>
          <option value='TCD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TCD') ? 'selected="selected"' : '' %>>Chad</option>
          <option value='CHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHL') ? 'selected="selected"' : '' %>>Chile</option>
          <option value='CHN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHN') ? 'selected="selected"' : '' %>>China</option>
          <option value='CXR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CXR') ? 'selected="selected"' : '' %>>Christmas Island</option>
          <option value='CCK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CCK') ? 'selected="selected"' : '' %>>Cocos (Keeling) Islands</option>
          <option value='COL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COL') ? 'selected="selected"' : '' %>>Colombia</option>
          <option value='COM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COM') ? 'selected="selected"' : '' %>>Comoros</option>
          <option value='COG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COG') ? 'selected="selected"' : '' %>>Congo</option>
          <option value='COD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COD') ? 'selected="selected"' : '' %>>Congo, the Democratic Republic of the</option>
          <option value='COK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COK') ? 'selected="selected"' : '' %>>Cook Islands</option>
          <option value='CRI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CRI') ? 'selected="selected"' : '' %>>Costa Rica</option>
          <option value='CIV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CIV') ? 'selected="selected"' : '' %>>Côte d'Ivoire</option>
          <option value='HRV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HRV') ? 'selected="selected"' : '' %>>Croatia</option>
          <option value='CUB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CUB') ? 'selected="selected"' : '' %>>Cuba</option>
          <option value='CUW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CUW') ? 'selected="selected"' : '' %>>Curaçao</option>
          <option value='CYP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CYP') ? 'selected="selected"' : '' %>>Cyprus</option>
          <option value='CZE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CZE') ? 'selected="selected"' : '' %>>Czech Republic</option>
          <option value='DNK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DNK') ? 'selected="selected"' : '' %>>Denmark</option>
          <option value='DJI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DJI') ? 'selected="selected"' : '' %>>Djibouti</option>
          <option value='DMA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DMA') ? 'selected="selected"' : '' %>>Dominica</option>
          <option value='DOM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DOM') ? 'selected="selected"' : '' %>>Dominican Republic</option>
          <option value='ECU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ECU') ? 'selected="selected"' : '' %>>Ecuador</option>
          <option value='EGY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'EGY') ? 'selected="selected"' : '' %>>Egypt</option>
          <option value='SLV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLV') ? 'selected="selected"' : '' %>>El Salvador</option>
          <option value='GNQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GNQ') ? 'selected="selected"' : '' %>>Equatorial Guinea</option>
          <option value='ERI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ERI') ? 'selected="selected"' : '' %>>Eritrea</option>
          <option value='EST' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'EST') ? 'selected="selected"' : '' %>>Estonia</option>
          <option value='ETH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ETH') ? 'selected="selected"' : '' %>>Ethiopia</option>
          <option value='FLK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FLK') ? 'selected="selected"' : '' %>>Falkland Islands (Malvinas)</option>
          <option value='FRO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FRO') ? 'selected="selected"' : '' %>>Faroe Islands</option>
          <option value='FJI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FJI') ? 'selected="selected"' : '' %>>Fiji</option>
          <option value='FIN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FIN') ? 'selected="selected"' : '' %>>Finland</option>
          <option value='FRA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FRA') ? 'selected="selected"' : '' %>>France</option>
          <option value='GUF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUF') ? 'selected="selected"' : '' %>>French Guiana</option>
          <option value='PYF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PYF') ? 'selected="selected"' : '' %>>French Polynesia</option>
          <option value='ATF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATF') ? 'selected="selected"' : '' %>>French Southern Territories</option>
          <option value='GAB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GAB') ? 'selected="selected"' : '' %>>Gabon</option>
          <option value='GMB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GMB') ? 'selected="selected"' : '' %>>Gambia</option>
          <option value='GEO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GEO') ? 'selected="selected"' : '' %>>Georgia</option>
          <option value='DEU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DEU') ? 'selected="selected"' : '' %>>Germany</option>
          <option value='GHA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GHA') ? 'selected="selected"' : '' %>>Ghana</option>
          <option value='GIB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GIB') ? 'selected="selected"' : '' %>>Gibraltar</option>
          <option value='GRC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRC') ? 'selected="selected"' : '' %>>Greece</option>
          <option value='GRL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRL') ? 'selected="selected"' : '' %>>Greenland</option>
          <option value='GRD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRD') ? 'selected="selected"' : '' %>>Grenada</option>
          <option value='GLP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GLP') ? 'selected="selected"' : '' %>>Guadeloupe</option>
          <option value='GUM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUM') ? 'selected="selected"' : '' %>>Guam</option>
          <option value='GTM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GTM') ? 'selected="selected"' : '' %>>Guatemala</option>
          <option value='GGY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GGY') ? 'selected="selected"' : '' %>>Guernsey</option>
          <option value='GIN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GIN') ? 'selected="selected"' : '' %>>Guinea</option>
          <option value='GNB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GNB') ? 'selected="selected"' : '' %>>Guinea-Bissau</option>
          <option value='GUY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUY') ? 'selected="selected"' : '' %>>Guyana</option>
          <option value='HTI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HTI') ? 'selected="selected"' : '' %>>Haiti</option>
          <option value='HMD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HMD') ? 'selected="selected"' : '' %>>Heard Island and McDonald Islands</option>
          <option value='VAT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VAT') ? 'selected="selected"' : '' %>>Holy See (Vatican City State)</option>
          <option value='HND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HND') ? 'selected="selected"' : '' %>>Honduras</option>
          <option value='HKG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HKG') ? 'selected="selected"' : '' %>>Hong Kong</option>
          <option value='HUN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HUN') ? 'selected="selected"' : '' %>>Hungary</option>
          <option value='ISL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ISL') ? 'selected="selected"' : '' %>>Iceland</option>
          <option value='IND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IND') ? 'selected="selected"' : '' %>>India</option>
          <option value='IDN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IDN') ? 'selected="selected"' : '' %>>Indonesia</option>
          <option value='IRN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRN') ? 'selected="selected"' : '' %>>Iran, Islamic Republic of</option>
          <option value='IRQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRQ') ? 'selected="selected"' : '' %>>Iraq</option>
          <option value='IRL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRL') ? 'selected="selected"' : '' %>>Ireland</option>
          <option value='IMN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IMN') ? 'selected="selected"' : '' %>>Isle of Man</option>
          <option value='ISR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ISR') ? 'selected="selected"' : '' %>>Israel</option>
          <option value='ITA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ITA') ? 'selected="selected"' : '' %>>Italy</option>
          <option value='JAM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JAM') ? 'selected="selected"' : '' %>>Jamaica</option>
          <option value='JPN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JPN') ? 'selected="selected"' : '' %>>Japan</option>
          <option value='JEY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JEY') ? 'selected="selected"' : '' %>>Jersey</option>
          <option value='JOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JOR') ? 'selected="selected"' : '' %>>Jordan</option>
          <option value='KAZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KAZ') ? 'selected="selected"' : '' %>>Kazakhstan</option>
          <option value='KEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KEN') ? 'selected="selected"' : '' %>>Kenya</option>
          <option value='KIR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KIR') ? 'selected="selected"' : '' %>>Kiribati</option>
          <option value='PRK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRK') ? 'selected="selected"' : '' %>>Korea, Democratic People's Republic of</option>
          <option value='KOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KOR') ? 'selected="selected"' : '' %>>Korea, Republic of</option>
          <option value='KWT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KWT') ? 'selected="selected"' : '' %>>Kuwait</option>
          <option value='KGZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KGZ') ? 'selected="selected"' : '' %>>Kyrgyzstan</option>
          <option value='LAO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LAO') ? 'selected="selected"' : '' %>>Lao People's Democratic Republic</option>
          <option value='LVA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LVA') ? 'selected="selected"' : '' %>>Latvia</option>
          <option value='LBN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBN') ? 'selected="selected"' : '' %>>Lebanon</option>
          <option value='LSO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LSO') ? 'selected="selected"' : '' %>>Lesotho</option>
          <option value='LBR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBR') ? 'selected="selected"' : '' %>>Liberia</option>
          <option value='LBY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBY') ? 'selected="selected"' : '' %>>Libya</option>
          <option value='LIE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LIE') ? 'selected="selected"' : '' %>>Liechtenstein</option>
          <option value='LTU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LTU') ? 'selected="selected"' : '' %>>Lithuania</option>
          <option value='LUX' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LUX') ? 'selected="selected"' : '' %>>Luxembourg</option>
          <option value='MAC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAC') ? 'selected="selected"' : '' %>>Macao</option>
          <option value='MKD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MKD') ? 'selected="selected"' : '' %>>Macedonia, the former Yugoslav Republic of</option>
          <option value='MDG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDG') ? 'selected="selected"' : '' %>>Madagascar</option>
          <option value='MWI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MWI') ? 'selected="selected"' : '' %>>Malawi</option>
          <option value='MYS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MYS') ? 'selected="selected"' : '' %>>Malaysia</option>
          <option value='MDV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDV') ? 'selected="selected"' : '' %>>Maldives</option>
          <option value='MLI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MLI') ? 'selected="selected"' : '' %>>Mali</option>
          <option value='MLT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MLT') ? 'selected="selected"' : '' %>>Malta</option>
          <option value='MHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MHL') ? 'selected="selected"' : '' %>>Marshall Islands</option>
          <option value='MTQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MTQ') ? 'selected="selected"' : '' %>>Martinique</option>
          <option value='MRT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MRT') ? 'selected="selected"' : '' %>>Mauritania</option>
          <option value='MUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MUS') ? 'selected="selected"' : '' %>>Mauritius</option>
          <option value='MYT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MYT') ? 'selected="selected"' : '' %>>Mayotte</option>
          <option value='MEX' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MEX') ? 'selected="selected"' : '' %>>Mexico</option>
          <option value='FSM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FSM') ? 'selected="selected"' : '' %>>Micronesia, Federated States of</option>
          <option value='MDA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDA') ? 'selected="selected"' : '' %>>Moldova, Republic of</option>
          <option value='MCO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MCO') ? 'selected="selected"' : '' %>>Monaco</option>
          <option value='MNG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNG') ? 'selected="selected"' : '' %>>Mongolia</option>
          <option value='MNE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNE') ? 'selected="selected"' : '' %>>Montenegro</option>
          <option value='MSR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MSR') ? 'selected="selected"' : '' %>>Montserrat</option>
          <option value='MAR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAR') ? 'selected="selected"' : '' %>>Morocco</option>
          <option value='MOZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MOZ') ? 'selected="selected"' : '' %>>Mozambique</option>
          <option value='MMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MMR') ? 'selected="selected"' : '' %>>Myanmar</option>
          <option value='NAM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NAM') ? 'selected="selected"' : '' %>>Namibia</option>
          <option value='NRU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NRU') ? 'selected="selected"' : '' %>>Nauru</option>
          <option value='NPL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NPL') ? 'selected="selected"' : '' %>>Nepal</option>
          <option value='NLD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NLD') ? 'selected="selected"' : '' %>>Netherlands</option>
          <option value='NCL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NCL') ? 'selected="selected"' : '' %>>New Caledonia</option>
          <option value='NZL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NZL') ? 'selected="selected"' : '' %>>New Zealand</option>
          <option value='NIC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NIC') ? 'selected="selected"' : '' %>>Nicaragua</option>
          <option value='NER' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NER') ? 'selected="selected"' : '' %>>Niger</option>
          <option value='NGA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NGA') ? 'selected="selected"' : '' %>>Nigeria</option>
          <option value='NIU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NIU') ? 'selected="selected"' : '' %>>Niue</option>
          <option value='NFK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NFK') ? 'selected="selected"' : '' %>>Norfolk Island</option>
          <option value='MNP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNP') ? 'selected="selected"' : '' %>>Northern Mariana Islands</option>
          <option value='NOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NOR') ? 'selected="selected"' : '' %>>Norway</option>
          <option value='OMN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'OMN') ? 'selected="selected"' : '' %>>Oman</option>
          <option value='PAK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PAK') ? 'selected="selected"' : '' %>>Pakistan</option>
          <option value='PLW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PLW') ? 'selected="selected"' : '' %>>Palau</option>
          <option value='PSE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PSE') ? 'selected="selected"' : '' %>>Palestinian Territory, Occupied</option>
          <option value='PAN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PAN') ? 'selected="selected"' : '' %>>Panama</option>
          <option value='PNG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PNG') ? 'selected="selected"' : '' %>>Papua New Guinea</option>
          <option value='PRY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRY') ? 'selected="selected"' : '' %>>Paraguay</option>
          <option value='PER' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PER') ? 'selected="selected"' : '' %>>Peru</option>
          <option value='PHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PHL') ? 'selected="selected"' : '' %>>Philippines</option>
          <option value='PCN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PCN') ? 'selected="selected"' : '' %>>Pitcairn</option>
          <option value='POL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'POL') ? 'selected="selected"' : '' %>>Poland</option>
          <option value='PRT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRT') ? 'selected="selected"' : '' %>>Portugal</option>
          <option value='PRI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRI') ? 'selected="selected"' : '' %>>Puerto Rico</option>
          <option value='QAT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'QAT') ? 'selected="selected"' : '' %>>Qatar</option>
          <option value='REU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'REU') ? 'selected="selected"' : '' %>>Réunion</option>
          <option value='ROU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ROU') ? 'selected="selected"' : '' %>>Romania</option>
          <option value='RUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'RUS') ? 'selected="selected"' : '' %>>Russian Federation</option>
          <option value='RWA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'RWA') ? 'selected="selected"' : '' %>>Rwanda</option>
          <option value='BLM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLM') ? 'selected="selected"' : '' %>>Saint Barthélemy</option>
          <option value='SHN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SHN') ? 'selected="selected"' : '' %>>Saint Helena, Ascension and Tristan da Cunha</option>
          <option value='KNA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KNA') ? 'selected="selected"' : '' %>>Saint Kitts and Nevis</option>
          <option value='LCA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LCA') ? 'selected="selected"' : '' %>>Saint Lucia</option>
          <option value='MAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAF') ? 'selected="selected"' : '' %>>Saint Martin (French part)</option>
          <option value='SPM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SPM') ? 'selected="selected"' : '' %>>Saint Pierre and Miquelon</option>
          <option value='VCT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VCT') ? 'selected="selected"' : '' %>>Saint Vincent and the Grenadines</option>
          <option value='WSM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'WSM') ? 'selected="selected"' : '' %>>Samoa</option>
          <option value='SMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SMR') ? 'selected="selected"' : '' %>>San Marino</option>
          <option value='STP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'STP') ? 'selected="selected"' : '' %>>Sao Tome and Principe</option>
          <option value='SAU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SAU') ? 'selected="selected"' : '' %>>Saudi Arabia</option>
          <option value='SEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SEN') ? 'selected="selected"' : '' %>>Senegal</option>
          <option value='SRB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SRB') ? 'selected="selected"' : '' %>>Serbia</option>
          <option value='SYC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SYC') ? 'selected="selected"' : '' %>>Seychelles</option>
          <option value='SLE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLE') ? 'selected="selected"' : '' %>>Sierra Leone</option>
          <option value='SGP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SGP') ? 'selected="selected"' : '' %>>Singapore</option>
          <option value='SXM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SXM') ? 'selected="selected"' : '' %>>Sint Maarten (Dutch part)</option>
          <option value='SVK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SVK') ? 'selected="selected"' : '' %>>Slovakia</option>
          <option value='SVN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SVN') ? 'selected="selected"' : '' %>>Slovenia</option>
          <option value='SLB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLB') ? 'selected="selected"' : '' %>>Solomon Islands</option>
          <option value='SOM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SOM') ? 'selected="selected"' : '' %>>Somalia</option>
          <option value='ZAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZAF') ? 'selected="selected"' : '' %>>South Africa</option>
          <option value='SGS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SGS') ? 'selected="selected"' : '' %>>South Georgia and the South Sandwich Islands</option>
          <option value='SSD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SSD') ? 'selected="selected"' : '' %>>South Sudan</option>
          <option value='ESP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ESP') ? 'selected="selected"' : '' %>>Spain</option>
          <option value='LKA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LKA') ? 'selected="selected"' : '' %>>Sri Lanka</option>
          <option value='SDN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SDN') ? 'selected="selected"' : '' %>>Sudan</option>
          <option value='SUR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SUR') ? 'selected="selected"' : '' %>>Suriname</option>
          <option value='SJM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SJM') ? 'selected="selected"' : '' %>>Svalbard and Jan Mayen</option>
          <option value='SWZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SWZ') ? 'selected="selected"' : '' %>>Swaziland</option>
          <option value='SWE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SWE') ? 'selected="selected"' : '' %>>Sweden</option>
          <option value='CHE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHE') ? 'selected="selected"' : '' %>>Switzerland</option>
          <option value='SYR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SYR') ? 'selected="selected"' : '' %>>Syrian Arab Republic</option>
          <option value='TWN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TWN') ? 'selected="selected"' : '' %>>Taiwan, Province of China</option>
          <option value='TJK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TJK') ? 'selected="selected"' : '' %>>Tajikistan</option>
          <option value='TZA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TZA') ? 'selected="selected"' : '' %>>Tanzania, United Republic of</option>
          <option value='THA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'THA') ? 'selected="selected"' : '' %>>Thailand</option>
          <option value='TLS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TLS') ? 'selected="selected"' : '' %>>Timor-Leste</option>
          <option value='TGO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TGO') ? 'selected="selected"' : '' %>>Togo</option>
          <option value='TKL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TKL') ? 'selected="selected"' : '' %>>Tokelau</option>
          <option value='TON' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TON') ? 'selected="selected"' : '' %>>Tonga</option>
          <option value='TTO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TTO') ? 'selected="selected"' : '' %>>Trinidad and Tobago</option>
          <option value='TUN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUN') ? 'selected="selected"' : '' %>>Tunisia</option>
          <option value='TUR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUR') ? 'selected="selected"' : '' %>>Turkey</option>
          <option value='TKM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TKM') ? 'selected="selected"' : '' %>>Turkmenistan</option>
          <option value='TCA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TCA') ? 'selected="selected"' : '' %>>Turks and Caicos Islands</option>
          <option value='TUV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUV') ? 'selected="selected"' : '' %>>Tuvalu</option>
          <option value='UGA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UGA') ? 'selected="selected"' : '' %>>Uganda</option>
          <option value='UKR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UKR') ? 'selected="selected"' : '' %>>Ukraine</option>
          <option value='ARE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARE') ? 'selected="selected"' : '' %>>United Arab Emirates</option>
          <option value='GBR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GBR') ? 'selected="selected"' : '' %>>United Kingdom</option>
          <option value='USA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'USA') ? 'selected="selected"' : '' %>>United States</option>
          <option value='UMI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UMI') ? 'selected="selected"' : '' %>>United States Minor Outlying Islands</option>
          <option value='URY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'URY') ? 'selected="selected"' : '' %>>Uruguay</option>
          <option value='UZB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UZB') ? 'selected="selected"' : '' %>>Uzbekistan</option>
          <option value='VUT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VUT') ? 'selected="selected"' : '' %>>Vanuatu</option>
          <option value='VEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VEN') ? 'selected="selected"' : '' %>>Venezuela, Bolivarian Republic of</option>
          <option value='VNM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VNM') ? 'selected="selected"' : '' %>>Viet Nam</option>
          <option value='VGB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VGB') ? 'selected="selected"' : '' %>>Virgin Islands, British</option>
          <option value='VIR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VIR') ? 'selected="selected"' : '' %>>Virgin Islands, U.S.</option>
          <option value='WLF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'WLF') ? 'selected="selected"' : '' %>>Wallis and Futuna</option>
          <option value='ESH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ESH') ? 'selected="selected"' : '' %>>Western Sahara</option>
          <option value='YEM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'YEM') ? 'selected="selected"' : '' %>>Yemen</option>
          <option value='ZMB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZMB') ? 'selected="selected"' : '' %>>Zambia</option>
          <option value='ZWE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZWE') ? 'selected="selected"' : '' %>>Zimbabwe</option>
        </select>
        <label>Country</label>
      </span>
    </div>
  """

  edit: """
    <%= Formbuilder.templates['edit/address_values']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-home"></span></span> Address
  """
