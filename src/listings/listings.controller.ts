import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { FilterListingDto } from './dto/filter-listing.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Listings } from './entities/listing.entity';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';
import { DeleteListingDto } from './dto/delete-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(
    private readonly listingsService: ListingsService,
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly repository: Repository<Listings>,

  ) {}
  @UseGuards(AuthGuard)
  @Get("obtener-propiedaded-buyer") // da todas las propiedades sin filtrar
  async findAll(dto:DeleteUserDto) {
    return this.listingsService.getPropertyBuyer(dto);
  }
  @UseGuards(AuthGuard)
  @Get("obtener-propiedaded-filtradas") //da todas las propiedades filtradas
  async getpropertyfiltered(@Param('id') id: string, @Body() filterDto: FilterListingDto) {
    return this.listingsService.getPropertyFiltered(id,filterDto);
  }
  @UseGuards(AuthGuard)
  @Get("obtener-propiedaded-owner") // da las propiedades de un propietario
  async finddAll(@Body() updateListingDto: UpdateListingDto)  {
    return this.listingsService.findAllOwner(updateListingDto)
  }

  @UseGuards(AuthGuard)
  @Post("registrar-propiedad") //registra una propiedad a un propietario
  async createliisting(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.createliisting(createListingDto)
  }
  @UseGuards(AuthGuard)
  @Patch('update-propiedad') // la actualiza
  async updatelisting(@Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.updatelisting(updateListingDto)
  }
  @UseGuards(AuthGuard)
  @Delete('eliminar-propiedad') // elimina una propiedad
  async deletelistings(@Body() deleteListingDto: DeleteListingDto) {
    return this.listingsService.deletelistings(deleteListingDto)
  }




}

